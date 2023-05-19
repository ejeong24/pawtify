import React from "react";
import Alert from "@mui/material/Alert";
export default function Alert() {
  return (
    <div>
      <Alert onClose={() => {}}>This is a success alert — check it out!</Alert>
      <Alert
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }>
        This is a success alert — check it out!
      </Alert>
    </div>
  );
}
