import React, { useState } from "react";
import { Button, Form, FormCheck, FormGroup } from "react-bootstrap";

const SummaryForm = () => {
  const [tcChecked, setTcChecked] = useState(false);

  const checkboxLabel = (
    <span>
      I agree to the <span style={{ color: "blue" }}>Terms and Conditions</span>
    </span>
  );

  return (
    <>
      <Form>
        <FormGroup controlId="terms-and-conditions">
          <FormCheck
            type="checkbox"
            checked={tcChecked}
            onChange={(e) => setTcChecked(e.target.checked)}
            label={checkboxLabel}
          />
        </FormGroup>
        <Button variant="primary" type="submit" disabled={!tcChecked}>
          Confirm Order
        </Button>
      </Form>
    </>
  );
};

export default SummaryForm;
