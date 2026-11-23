import groq from "../config/ai.js";

export const chatController = async (req, res) => {
  try {

    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        message: "Message is required and it should be of type String."
      })
    }
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant. Keep answers short and concise. Return plain text only. Do not use Markdown, headings, tables, or formatting. Do not provide options or extra information. Answer only what the user asks."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    const chat = response.choices[0]?.message.content;

    return res.status(200).json({
      success: true,
      message: chat
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!"
    })
  }

}