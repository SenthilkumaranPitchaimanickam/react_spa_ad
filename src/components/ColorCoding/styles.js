import { styled } from '../../style';

export const ColorCodeContainer = styled.div`max-width: 70px;`;

export const ColorCode = styled.div`
	background-color: ${({ color, theme }) => theme.colors.calendar.status[color]};
	margin-top: -6px;
	width: 10px;
	height: 10px;
	border-radius: 10px;
	::after {
		content: ${({ color }) => 'color'};
	}
`;
export const ColorLabel = styled.div`
	padding: 2px 0px 4px 12px;
	margin: -14px 16px 3px 0px;
	font-size: 10px;
`;
