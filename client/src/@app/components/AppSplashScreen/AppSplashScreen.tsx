import React from "react";

const AppSplashScreen: React.FC = () => {
	return (
		<div id="app-splash-screen">
			<div className="center">
				<div className="logo">
					<img
						width="200"
						src="logo192.png"
						alt="logo"
					/>
				</div>
				<div className="spinner-wrapper">
					<div className="spinner">
						<div className="inner">
							<div className="gap" />
							<div className="left">
								<div className="half-circle" />
							</div>
							<div className="right">
								<div className="half-circle" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default React.memo(AppSplashScreen);
