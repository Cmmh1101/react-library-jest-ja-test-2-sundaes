import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

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
  userEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();
  // second checkbox click disables button
  userEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);

  // popover starts hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  // expect(nullPopover).toBeNull();
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disapears when we mouse
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
