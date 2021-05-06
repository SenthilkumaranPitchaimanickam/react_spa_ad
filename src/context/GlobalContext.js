import React, { useEffect, useMemo,  useReducer, createContext, useCallback } from 'react';
import {REDUCER} from './Reducer';
import {restructureAppointments} from '../utils'
import pageInterface from '../services/pageInterface';
import { dataHandler, processResponse } from '../utils';
import { Views } from 'react-big-calendar';
import moment from 'moment'
import {getSetting} from "../services/constants";

const GlobalContext = createContext();
const GlobalContextProvider = (props) => {
	const [ state, dispatch ] = useReducer(REDUCER, {
        bays:null,
        loading:false,
        loadingAppointments:false,
        page: 0,
        appointments:null,
        appointmentIndices:[],
        date: new Date(),
        view: Views.DAY,
        bayInfo:{
            bayName: 'Warehouse Scottsdale',
            bayId: 'f20d7f05-8c93-42a7-b951-df8505b69de3'
        },
        warehouseInfo:null,
        selectedWarehouse:null,
        status: [
            { id: "scheduled",  label: "Scheduled" },
            { id: "not_scheduled", label: "Not Scheduled" },
            { id: "canceled",  label: "Canceled" }
          ],
          userdetails:{},
        holidays:['4/9/2021','4/16/2021']
    });
    const service = pageInterface.init();


    const fetchWareHouse= useCallback(async()=> {
        try {
          const response =  await service.appointments.fetchAllWareHouse();
          dispatch({type:'UPDATE', payload:{warehouseInfo: response?.data??null, selectedWarehouse: response?.data[0]??null}});
        } 
        catch (error)
         {
            console.log(error);
        }
    },[]);
    useEffect(() => {
        fetchWareHouse()
   }, [fetchWareHouse]);


    const fetchBayInfo = useCallback(async(warehouseId) => {
        try{

            dispatch({type:'UPDATE', payload:{loadingAppointments:true}});
            const response = await Promise.all([ service.appointments.fetchBayInfo({warehouseId}),  service.appointments.fetchAllServicesByWarehouseId(warehouseId)])
            const bayInfo = response[0]?.data?.map(({id:bayId, name:bayName})=>({bayId, bayName}))
            dispatch({type:'UPDATE', payload:{loadingAppointments:false, bays:bayInfo, services:response[1]?.data}});
        }
        catch(err)
        {
            dispatch({type:'UPDATE', payload:{loadingAppointments:false}});
        }
        }, []);

    useEffect(() => {
        state?.selectedWarehouse!==null && fetchBayInfo(state?.selectedWarehouse?.id)
    }, [state?.selectedWarehouse,fetchBayInfo]);


    const fetchAppointments = useCallback(async(date, warehouse ) => {
        try{
            dispatch({type:'UPDATE_APPOINTMENTS', payload:{loadingAppointments:true}});
            const fromDate = moment(date).startOf('week').format("YYYY-MM-D")
            const toDate = moment(date).endOf('week').format("YYYY-MM-D")
            const response = await service.appointments.fetchAppointmentsInDashboard({warehouseId:warehouse?.id, fromDate, toDate});
            let appointments = restructureAppointments(response?.data);
                dispatch({type:'UPDATE_APPOINTMENTS', payload:{loadingAppointments:false, appointments:appointments}});
        }
        catch(err)
        {
            console.log(err)
            dispatch({type:'UPDATE', payload:{loadingAppointments:false}});
        }
        }, []);

        useEffect(() => {
            state.date !== null && fetchAppointments(state?.date, state?.selectedWarehouse)
        }, [state.date, state.selectedWarehouse, fetchAppointments]);


        const fetchAzConfig = useCallback(async() => {            
            let env = await getSetting("SPAENV");
            let payload = await getSetting("ServicePayloadLogEnabled");
            console.log("ServicePayloadLogEnabled");
            console.log(payload);
            console.log("SPAENV");
            console.log(env);
        }, []);

        useEffect(() => {
            fetchAzConfig()
        }, [fetchAzConfig]);


        const value = useMemo(() => {
        return {state, dispatch}
    }, [ state ]);

    if(state?.loading)
    return <div>Loading Indicator</div>

    return <GlobalContext.Provider value={value}>
{props.children}
    </GlobalContext.Provider>
};



export { GlobalContextProvider, GlobalContext}
