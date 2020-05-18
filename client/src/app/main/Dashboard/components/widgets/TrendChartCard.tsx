import { AppUtils } from '@app';
import { Avatar } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import React from 'react';
import Trend from 'react-trend';

type Props = {
	title: string;
	data: Array<number>;
	icon: string;
};

const TrendChartCard: React.FC<Props> = (props: Props) => {
	if (!props.data || props.data.length < 2) {
		return null;
	}

	return (
		<Card elevation={4} className="border-0 card-shadow-first p-4 mb-4">
			<div className="flex items-center">
				<Avatar className="mr-2">
					<Icon>{props.icon}</Icon>
				</Avatar>
				<div className="text-black-50">{props.title}</div>
			</div>
			<Trend
				smooth
				autoDraw
				autoDrawDuration={3000}
				autoDrawEasing="ease-out"
				data={props.data}
				gradient={[AppUtils.randomColor()]}
				radius={25}
				strokeWidth={5}
				strokeLinecap={'butt'}
			/>
		</Card>
	);
};

export default React.memo(TrendChartCard);
