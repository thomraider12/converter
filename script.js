// script.js
document.addEventListener("DOMContentLoaded", () => {
    const converterType = document.getElementById("converter-type");
    const fromUnit = document.getElementById("from-unit");
    const toUnit = document.getElementById("to-unit");
    const convertBtn = document.getElementById("convert-btn");
    const resultText = document.getElementById("result-text");
  
    // Dados básicos (em português)
    const units = {
      moeda: ["EUR", "USD", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY"],
      distância: ["Quilómetros", "Milhas", "Metros", "Jardas", "Pés", "Milhas Náuticas", "Centímetros"],
      altura: ["Metros", "Pés", "Polegadas", "Centímetros", "Milímetros"],
      peso: ["Quilogramas", "Libras", "Gramas", "Onças", "Toneladas"],
      volume: ["Litros", "Mililitros", "Galões", "Copos", "Pintas", "Quartos"],
      tempo: ["Segundos", "Minutos", "Horas", "Dias", "Semanas", "Meses", "Anos"],
      temperatura: ["Celsius", "Fahrenheit", "Kelvin"],
      velocidade: ["Metros/segundo", "Quilómetros/hora", "Milhas/hora", "Nós"],
    };
  
    // Atualiza as opções de unidades
    converterType.addEventListener("change", () => {
      const type = converterType.value;
      fromUnit.innerHTML = units[type].map(unit => `<option value="${unit}">${unit}</option>`).join("");
      toUnit.innerHTML = fromUnit.innerHTML;
    });
  
    // Função de animação para resultados
    const animateResult = (text) => {
      resultText.style.opacity = "0";
      setTimeout(() => {
        resultText.textContent = text;
        resultText.style.opacity = "1";
      }, 300);
    };
  
    // Função de conversão
    const convertValue = (type, value, from, to) => {
      switch (type) {
        case "moeda":
          return value * (from === "EUR" && to === "USD" ? 1.1 : 0.9); // Simulação
        case "distância":
          if (from === "Quilómetros" && to === "Milhas") return value * 0.621371;
          if (from === "Milhas" && to === "Quilómetros") return value / 0.621371;
          break;
        case "altura":
          if (from === "Metros" && to === "Pés") return value * 3.28084;
          if (from === "Pés" && to === "Metros") return value / 3.28084;
          break;
        case "peso":
          if (from === "Quilogramas" && to === "Libras") return value * 2.20462;
          if (from === "Libras" && to === "Quilogramas") return value / 2.20462;
          break;
        case "volume":
          if (from === "Litros" && to === "Galões") return value * 0.264172;
          if (from === "Galões" && to === "Litros") return value / 0.264172;
          break;
        case "tempo":
          if (from === "Segundos" && to === "Minutos") return value / 60;
          if (from === "Minutos" && to === "Segundos") return value * 60;
          break;
        case "temperatura":
          if (from === "Celsius" && to === "Fahrenheit") return (value * 9/5) + 32;
          if (from === "Fahrenheit" && to === "Celsius") return (value - 32) * 5/9;
          if (from === "Celsius" && to === "Kelvin") return value + 273.15;
          if (from === "Kelvin" && to === "Celsius") return value - 273.15;
          break;
        case "velocidade":
          if (from === "Metros/segundo" && to === "Quilómetros/hora") return value * 3.6;
          if (from === "Quilómetros/hora" && to === "Metros/segundo") return value / 3.6;
          break;
        default:
          return value; // Se nenhuma conversão for aplicável
      }
      return "Conversão inválida!";
    };
  
    // Lógica do botão "Converter"
    convertBtn.addEventListener("click", () => {
      const value = parseFloat(document.getElementById("value").value);
      const from = fromUnit.value;
      const to = toUnit.value;
      const type = converterType.value;
  
      if (isNaN(value)) {
        animateResult("Por favor, insira um valor válido.");
        return;
      }
  
      const result = convertValue(type, value, from, to);
      animateResult(`${result.toFixed(2)} ${to}`);
    });
  
    // Inicializa os dropdowns
    converterType.dispatchEvent(new Event("change"));
  });  