import emailjs from 'emailjs-com';

interface EmailParams {
  message: string;
  giftTitle?: string;
  name?: string;
}

/**
 * Send an email using EmailJS
 * Note: You'll need to sign up for EmailJS and configure the service
 */
export const sendEmail = async (params: EmailParams): Promise<boolean> => {
  try {
    // Replace with your actual EmailJS service values
    const result = await emailjs.send(
      'YOUR_SERVICE_ID', // Replace with your service ID
      'YOUR_TEMPLATE_ID', // Replace with your template ID
      {
        message: params.message,
        gift_title: params.giftTitle || '',
        from_name: params.name || 'Your Love',
      },
      'YOUR_USER_ID' // Replace with your user ID
    );
    
    return result.status === 200;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};