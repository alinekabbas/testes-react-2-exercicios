import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Modal from "../components/Modal"

const activeModalMock = {
    sprites: {
        front_default: "https://picsum.photos/200"
    },
    id: "1",
    name: "pokemon",
    types: [
        { type: { name: "tipo" } }
    ],
    weight: 10,
    height: 10
}

const closeModalMock = jest.fn()

describe("Modal", () => {
    test('renderização de imagem, id, nome, typos, peso e altura', () => {
        render(<Modal
            activeModal={activeModalMock}
            closeModal={closeModalMock}
        />)
        //screen.logTestingPlaygroundURL()

        const image = screen.getByRole('img', {
            name: /pokemon/i
        })

        const id = screen.getByRole('heading', {
            name: /#1 pokemon/i
        })

        const name = screen.getByText(/pokemon/i)

        const type = screen.getByText(/tipo/i)

        const weigth = screen.getByText(/1\.0 kg/i)

        const heigth = screen.getByText(/1\.0 m/i)

        const button = screen.getByRole('button', {
            name: /❌/i
        })

        expect(image).toBeInTheDocument()
        expect(id).toBeInTheDocument()
        expect(name).toBeInTheDocument()
        expect(type).toBeInTheDocument()
        expect(weigth).toBeInTheDocument()
        expect(heigth).toBeInTheDocument()
        expect(button).toBeInTheDocument()

    })

    test('fechamento do modal', async () => {
        const user = userEvent.setup()

        render(<Modal
            activeModal={activeModalMock}
            closeModal={closeModalMock}
        />)
    
        const button = screen.getByRole('button', {
            name: /❌/i
        })
    
        await user.click(button)

        expect(closeModalMock).toBeCalledTimes(1)
        expect(closeModalMock).toReturn()

    })

})