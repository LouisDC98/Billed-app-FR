import { fireEvent, screen } from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import Bills from "../containers/Bills.js"
import { ROUTES } from "../constants/routes.js"

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", () => {
      const html = BillsUI({ data: []})
      document.body.innerHTML = html
      //to-do write expect expression
    })
    test("Then bills should be ordered from earliest to latest", () => {
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
      const dates = screen.getAllByText(/^([1-9]|[12][0-9]|3[01]) ([a-zé]{3,4}[.]) (\d{2})$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    })
  })
})

describe("Given an employee enter his email and his password", () => {
  describe("When the inputs are wrong", () => {
    test("Then error page appear", () => {
      const html = BillsUI({ error: 'some error message' })
      document.body.innerHTML = html
      expect(screen.getAllByText('Erreur')).toBeTruthy()
      expect(screen.getAllByText('some error message')).toBeTruthy()
    })
  })
  describe("When the inputs are good", () => {
    test("Then loading page appear", () => {
      const html = BillsUI({ loading: true })
      document.body.innerHTML = html
      expect(screen.getAllByText('Loading...')).toBeTruthy()
    })
  })
})

describe("Given I am connected as an employee", () => {
  describe("When I click on button 'Nouvelle note de frais'", () => {
    test("Then the page new bill appear", () => {
      document.body.innerHTML = BillsUI(bills);

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }

      const bill = new Bills({
        document,
        onNavigate,
        firestore: null,
        localStorage: window.localStorage
      })

      const btnNewBill = screen.getByTestId('btn-new-bill');
      const mockFunction = jest.fn(bill.handleClickNewBill)

      btnNewBill.addEventListener('click', mockFunction)
      fireEvent.click(btnNewBill)

      expect(mockFunction).toHaveBeenCalled()
    })
  })
})