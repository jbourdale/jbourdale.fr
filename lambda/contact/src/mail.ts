import * as SIB from 'sib-api-v3-sdk'

const client = SIB.ApiClient.instance
const auth = client.authentications['api-key']
auth.apiKey = process.env.SENDINBLUE_API_KEY

const timeoutPromise = () => new Promise((_, reject) => {
    setTimeout(
        () => reject(new Error('timeout')),
        parseInt(process.env.SENDING_TIMEOUT || '5000')
    );
})

export const sendMail = async (from: string, htmlContent: string) => {
    const transacApi = new SIB.TransactionalEmailsApi();
    
    const mail = new SIB.SendSmtpEmail();
    mail.subject = `Contact from <${from}> on jbourdale.fr`
    mail.htmlContent = htmlContent
    mail.sender = { 
        "name": "Contact form jbourdale.fr",
        "email": "contact@jbourdale.fr"
    }
    mail.to = [
        { 
            "email": "jules.bourdale@gmail.com",
            "name": "Jules Bourdalé" 
        }
    ];
    
    try {
        return await Promise.race([transacApi.sendTransacEmail(mail), timeoutPromise()])
    } catch (err) {
        console.error('Error occured while sending mail :', err)
        throw err;
    }
}