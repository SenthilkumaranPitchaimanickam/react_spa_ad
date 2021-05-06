import React from 'react';
import { ColorCodeContainer, ColorCode, ColorLabel } from './styles';
import { theme } from '../../style';
import { useTranslation } from 'react-i18next';

const AppointmentColorCode = () => {
	const { t } = useTranslation(['translations','calendar']);
	return (
		<React.Fragment>
			<div className="container">
				<div className="row w-100">
					{Object.entries(theme.main.colors.calendar.status).map(([ key, value ]) => (
						<ColorCodeContainer className="col">
							<ColorCode color={key} />
							<ColorLabel>{t(`calendar:${key}`, key)}</ColorLabel>
						</ColorCodeContainer>
					))}
				</div>
			</div>
		</React.Fragment> 
	);
};
export default AppointmentColorCode;
