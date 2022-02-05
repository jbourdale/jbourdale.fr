const FEEDBACK_SUCCESS_ANIMATION_DURATION = 5000;
const FEEDBACK_ERROR_ANIMATION_DURATION = 5000;
const formEls = {
  from: document.getElementById('mail-from'),
  content: document.getElementById('mail-content'),
  send: document.getElementById('send-mail-btn'),
  loader: document.getElementById('mail-loader'),
  feedbacks: {
    success: document.getElementById('mail-feedback-success'),
    error: document.getElementById('mail-feedback-error')
  }
}

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

/** 
 * Reset errors feedback
 */
formEls.from.addEventListener('change', () => {
  formEls.from.classList.remove('is-invalid')
})

formEls.content.addEventListener('change', () => {
  formEls.content.classList.remove('is-invalid')
})

formEls.send.addEventListener('click', async () => {
  let mailSuccess;

  formEls.send.classList.add('hide')
  formEls.loader.classList.remove('hide')

  // add feedback errors
  if (!formEls.from.value)
    formEls.from.classList.add('is-invalid')    
  if (!formEls.content.value)
    formEls.content.classList.add('is-invalid')

  resetLoaderAfter()
    .then(async () => {
      console.log('mailSuccess', mailSuccess)
      await (
        mailSuccess
          ? showFeedbackSuccess() 
          : showFeedbackError()
      )
      resetForm()
    })
  
  mailSuccess = await sendMail({ from: formEls.from.value, content: formEls.content.value })
})

const resetLoaderAfter = (delay = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      formEls.loader.classList.add('hide')
      resolve()
    }, delay)
  })
}

const showFeedbackSuccess = async () => {
  formEls.feedbacks.success.classList.remove('hide')
  return new Promise(resolve => {
    setTimeout(() => {
      formEls.feedbacks.success.classList.add('hide')
      resolve()
    }, FEEDBACK_SUCCESS_ANIMATION_DURATION)
  })
}

const showFeedbackError = async () => { 
  formEls.feedbacks.error.classList.remove('hide')
  return new Promise(resolve => {
    setTimeout(() => {
      formEls.feedbacks.error.classList.add('hide')
      resolve()
    }, FEEDBACK_ERROR_ANIMATION_DURATION)
  })
}

const resetForm = () => {
  formEls.from.value = ''
  formEls.content.value = ''
  formEls.send.classList.remove('hide')
  formEls.loader.classList.add('hide')
}