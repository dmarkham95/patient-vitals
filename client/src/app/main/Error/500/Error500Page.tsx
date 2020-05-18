import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";


const Error500Page: React.FC = () => (
  <div className="flex flex-col flex-1 items-center justify-center p-16">
    <div className="max-w-512 text-center">
      <Typography variant="h1" color="inherit" className="font-medium mb-16">
        500
      </Typography>

      <Typography variant="h5" color="textSecondary" className="mb-16">
        Well, you broke the internet!
      </Typography>

      <Typography variant="subtitle1" color="textSecondary" className="mb-48">
        Just kidding, looks like we have an internal issue, please try again in
        couple minutes
      </Typography>

      <Link className="font-medium" to="/">
        Home
      </Link>
    </div>
  </div>
);

export default Error500Page;
