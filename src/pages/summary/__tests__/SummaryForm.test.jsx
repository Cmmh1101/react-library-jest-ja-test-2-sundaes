import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("renders summary form view", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to the Terms and Conditions",
  });

  //   checkbox is unchecked by default and button is disabled
  expect(checkbox).not.toBeChecked();
  const confirmButton = screen.getByRole("button", { name: "Confirm Order" });
  expect(confirmButton).toBeDisabled();
});

test("Checkbox enables button on first click and disables on second", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to the Terms and Conditions",
  });
  const confirmButton = screen.getByRole("button", { name: "Confirm Order" });

  // click checkbox enables button
  fireEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();
  // second checkbox click disables button
  fireEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});
