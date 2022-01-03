const backendUrl = process.env.MAIL_BACKEND_URL || 'https://europe-west3-regal-ceiling-161616.cloudfunctions.net/contact-jbourdale/contact'

const sendMail = async (mail) => {
    const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mail)
      });
      return response.json(); // parses JSON response into native JavaScript objects
}

document.getElementById('send-mail-btn').addEventListener('click', async () => {
    const from = document.getElementById('mail-from').value
    const content = document.getElementById('mail-content').value

    const resp = await sendMail({ from, content })
    console.log('resp : ', resp)
})