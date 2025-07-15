async function generateImage() {
  const prompt = document.getElementById("prompt").value.trim();
  const resultDiv = document.getElementById("result");

  if (!prompt) {
    alert("Пожалуйста, введите описание изображения");
    return;
  }

  resultDiv.innerHTML = "<p>Генерация изображения...</p>";

  try {
    const response = await fetch("https://api.replicate.com/v1/models/stability-ai/sdxl/predictions ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "r8_QmwIOngwNiEZMmB5eCJMEyVOaKw7YrM444sBx", // Твой API-ключ
      },
      body: JSON.stringify({
        input: {
          prompt: prompt,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      resultDiv.innerHTML = `<p style="color:red;">Ошибка: ${data.error}</p>`;
      console.error(data.error);
      return;
    }

    const imageUrl = data.output[0];

    resultDiv.innerHTML = `
      <p>Изображение готово:</p>
      <img src="${imageUrl}" alt="Сгенерированное изображение" />
      <p><a href="${imageUrl}" target="_blank">Открыть в новом окне</a></p>
    `;
  } catch (error) {
    console.error("Произошла ошибка:", error);
    resultDiv.innerHTML = `<p style="color:red;">Произошла ошибка: ${error.message}</p>`;
  }
}
