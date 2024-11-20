import { render, screen, fireEvent } from "@testing-library/react";
import { GardenModal } from "../components/GardenModal/GardenModal";
import { PointsContext } from "../context/PointsContext";

describe("GardenModal", () => {
  const mockOnClose = jest.fn();

  const renderModal = (isOpen: boolean = true) => {
    return render(
      <PointsContext.Provider value={{ totalScore: 0, setTotalScore: () => { }, lastNotifiedLevel: 0, setLastNotifiedLevel: () => {}, }}>
        <GardenModal isOpen={isOpen} onClose={mockOnClose} />
      </PointsContext.Provider>
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
