import { render, screen, fireEvent } from "@testing-library/react";
import { GardenModal } from "../components/GardenModal/GardenModal";
import { PointsContext } from "../context/PointsContext";
import { AuthProvider } from "../context/AuthContext";

describe("GardenModal", () => {
  const mockOnClose = jest.fn();

  const renderModal = (isOpen: boolean = true) => {
    return render(
      <AuthProvider>
        <GardenModal isOpen={isOpen} onClose={mockOnClose} />
      </AuthProvider>
    );
  };

  it("should not render when closed", () => {
    renderModal(false);
    const modal = screen.queryByRole("dialog");
    expect(modal).not.toBeInTheDocument();
  });

  it("should render when open", () => {
    renderModal();
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", () => {
    renderModal();
    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
