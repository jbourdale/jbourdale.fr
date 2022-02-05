const backendUrl = process.env.MAIL_BACKEND_URL || 'http://europe-west3-regal-ceiling-161616.cloudfunctions.net/contact-jbourdale/contact'

const sendMail = async (mail) => {
    const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mail)
      });
      return response.status === 204;
}

document.getElementById('send-mail-btn').addEventListener('click', async () => {
    const fromEl = document.getElementById('mail-from')
    const contentEl = document.getElementById('mail-content')

    if (!fromEl.value)
      fromEl.classList.add('is-invalid')    
    if (!contentEl.value)
      contentEl.classList.add('is-invalid')

    const success = await sendMail({ from: fromEl.value, content: contentEl.value })
    if (!success) {
      alert('Failed to send mail')
    }
})