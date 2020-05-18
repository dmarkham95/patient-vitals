import { AppUtils } from '@app';
import { Avatar } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import React from 'react';

type Props = {
	title: string;
	value: string;
	icon: string;
};

const DataCard: React.FC<Props> = (props: Props) => {
	return (
		<Card elevation={4} className="border-0 card-shadow-first p-4 mb-4">
			<div className="flex items-center">
				<Avatar className="mr-2">
					<Icon>{props.icon}</Icon>
				</Avatar>
				<div className="text-black-50">{props.title}</div>
			</div>
			<div className="text-center text-4xl font-light leading-tight text-black flex items-center pt-4 pb-8 justify-center">
				<div>{AppUtils.numberWithCommas(props.value)}</div>
			</div>
		</Card>
	);
};

export default React.memo(DataCard);
