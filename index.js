const main = document.querySelector("main")
const root = document.querySelector(":root")
const input = document.getElementById("input")
const resultInput = document.getElementById("result")
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

// Para cada caractere da calculadora que ocorrer um click, o input receberá o valor com o evento acionado
document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
    charKeyBtn.addEventListener("click", function () {
      const value = charKeyBtn.dataset.value
      input.value += value
    })
  })

// Evento para limpar o input
document.getElementById("clear").addEventListener("click", () => {
    input.value = ""
    input.focus()
})

// Evento para quando apertar uma tecla que esteja no array da calculadora, adicione ao input
input.addEventListener("keydown", function (ev){
    ev.preventDefault()

    if(allowedKeys.includes(ev.key)){
        input.value += ev.key
        return
    }

    if(ev.key === "Backspace") {
        input.value += input.value.slice(0, -1)
    }

    if(ev.key === "Enter"){
        calculate()
    }

})

// Pegando o elemento e chamando a função calculate ao clicar.
document.getElementById("equal").addEventListener("click", calculate)

// Função cálculo usando eval
function calculate() {

  resultInput.value = "ERROR"
  resultInput.classList.add("error")

  const result = eval(input.value)
  resultInput.value = result

  resultInput.classList.remove("error")
}

// Função que copia o input da calculadora, e mostra as mensagens de copiado
document.getElementById("copyToClipboard").addEventListener("click", function (ev) {
    const button = ev.currentTarget
    if (button.innerText === "Copy") {
      button.innerText = "Copied!"
      button.classList.add("success")
      navigator.clipboard.writeText(resultInput.value)
    } else {
      button.innerText = "Copy"
      button.classList.remove("success")
    }
  })