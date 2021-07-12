import { fireEvent, screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import { ROUTES } from "../constants/routes"

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then ...", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion
    })
  })
})

describe("Given I am connected as an employee", () => {
  describe("When I fill input with good extension file", () => {
    test("Then the file should be upload", () => {
      document.body.innerHTML = NewBillUI();

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }

      const newBill = new NewBill({
        document,
        onNavigate,
        firestore: null,
        localStorage: window.localStorage
      })

      const fileInput = screen.getByTestId("file");
      const mockFunction = jest.fn(newBill.handleChangeFile)

      fileInput.addEventListener('change', mockFunction)
      fireEvent.change(fileInput, {
        target: {
          files: [new File([''], 'chucknorris.png', { type: 'image/png' })],
        },
      })
      expect(mockFunction).toHaveBeenCalled()
      expect(!fileInput.classList.contains('red-border')).toBeTruthy();

      fileInput.addEventListener('change', mockFunction)
      fireEvent.change(fileInput, {
        target: {
          files: [new File([''], 'chucknorris.jpeg', { type: 'image/jpeg' })],
        },
      })
      expect(mockFunction).toHaveBeenCalled()
      expect(!fileInput.classList.contains('red-border')).toBeTruthy();

      fileInput.addEventListener('change', mockFunction)
      fireEvent.change(fileInput, {
        target: {
          files: [new File([''], 'chucknorris.jpg', { type: 'image/jpg' })],
        },
      })
      expect(mockFunction).toHaveBeenCalled()
      expect(!fileInput.classList.contains('red-border')).toBeTruthy();
    })
  })
  describe("When I fill input with wrong extension file", () => {
    test("Then the file should not be upload", () => {
      document.body.innerHTML = NewBillUI();

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }

      const newBill = new NewBill({
        document,
        onNavigate,
        firestore: null,
        localStorage: window.localStorage
      })

      const fileInput = screen.getByTestId("file");

      const mockFunction = jest.fn(newBill.handleChangeFile)
      fileInput.addEventListener('change', mockFunction)
      fireEvent.change(fileInput, {
        target: {
          files: [new File([''], 'chucknorris.gif', { type: 'image/gif' })],
        },
      })
      expect(mockFunction).toHaveBeenCalled()
      expect(fileInput.classList.contains('red-border')).toBeTruthy();
    })
  })
})

describe("Given I am connected as an employee", () => {
  describe("When I click on submit button", () => {
    test("Then the function handleSubmit should be called", () => {
      document.body.innerHTML = NewBillUI();

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        email: 'test@test.com'
      }))

      const newBill = new NewBill({
        document,
        onNavigate,
        firestore: null,
        localStorage: window.localStorage
      })

      const form = screen.getByTestId("form-new-bill");
      const mockFunction = jest.fn(newBill.handleSubmit)

      form.addEventListener('submit', mockFunction)
      fireEvent.submit(form)

      expect(mockFunction).toHaveBeenCalled()
    })
  })
})