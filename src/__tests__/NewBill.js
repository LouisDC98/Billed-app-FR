import { fireEvent, screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import { ROUTES } from "../constants/routes"
import firebase from "../__mocks__/firebase"

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

describe("Given I am a user connected as Employee", () => {
  describe("When I fill new bill form", () => {
    test("Fetches bill ID from mock API post", async() => {
      const dataBill = {
        email:  'test@test',
        type: 'Restaurants et bars',
        name:  '',
        amount: 20,
        date:  '2021-07-22',
        vat: '',
        pct: 20,
        commentary: '',
        fileUrl: '',
        fileName: 'justificatif.png',
      }

      const postSpy = jest.spyOn(firebase, 'post')
      const postBill = await firebase.post(dataBill)

      expect(postSpy).toHaveBeenCalledTimes(1)
      expect(postSpy).toReturn()

      expect(postBill.id).toMatch("47qAXb6fIm2zOKkLzMro")

      const getSpy = jest.spyOn(firebase, "get")
      const bills = await firebase.get()
      expect(getSpy).toHaveBeenCalledTimes(1)
      expect(bills.data[0].id).toBe(postBill.id)
    })
  })
  describe("When I click on submit button", () => {
    test("Then the function handleSubmit should be called", () => {
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

      const form = screen.getByTestId("form-new-bill");
      const mockFunction = jest.fn(newBill.handleSubmit)

      form.addEventListener('submit', mockFunction)
      fireEvent.submit(form)

    expect(mockFunction).toHaveBeenCalled()
    })
  })
})
