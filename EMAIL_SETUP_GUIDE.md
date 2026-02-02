# Email & SMS Setup Guide

This guide will help you set up email and SMS notifications for your wedding service website.

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Create Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email service)
4. Connect your Gmail account (muteteriangelique15@gmail.com)
5. Save the **Service ID** (you'll need this)

## Step 3: Create Email Templates

### Template 1: Contact Form Email

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Name it: "Contact Form Notification"
4. Use this template:

```
Subject: New Wedding Inquiry from {{from_name}}

Hello,

You have received a new wedding inquiry:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{user_phone}}
Service: {{service}}
Wedding Date: {{wedding_date}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

5. Save and note the **Template ID**

### Template 2: SMS Notification (via Email-to-SMS)

1. Create another template named "SMS Notification"
2. Use this template:

```
Subject: New Inquiry: {{from_name}}

New wedding inquiry from {{from_name}} ({{from_email}}). 
Service: {{service}}
Date: {{wedding_date}}
Phone: {{user_phone}}
```

3. Save and note the **Template ID**

### Template 3: Newsletter Subscription

1. Create template named "Newsletter Subscription"
2. Use this template:

```
Subject: New Newsletter Subscription

New subscriber: {{subscriber_email}}
```

3. Save and note the **Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key**

## Step 5: Update Your Website

Open `script.js` and replace these placeholders:

1. Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key
2. Replace `YOUR_SERVICE_ID` with your Service ID
3. Replace `YOUR_TEMPLATE_ID` with your Contact Form Template ID
4. Replace `YOUR_SMS_TEMPLATE_ID` with your SMS Template ID
5. Replace `YOUR_NEWSLETTER_TEMPLATE_ID` with your Newsletter Template ID

## Step 6: SMS Setup (Alternative Methods)

### Option A: Email-to-SMS Gateway
For Rwanda phone numbers, you can use email-to-SMS gateways. Common formats:
- MTN Rwanda: `0787827215@sms.mtn.co.rw`
- Airtel Rwanda: `0787827215@sms.airtel.co.rw`

Update the SMS sending code in `script.js` with the correct gateway.

### Option B: Use Twilio (Requires Backend)
For reliable SMS delivery, consider using Twilio API with a backend service.

## Step 7: Test Your Setup

1. Fill out the contact form on your website
2. Check your email (muteteriangelique15@gmail.com)
3. Check your phone (0787827215) for SMS notification

## Troubleshooting

- If emails don't arrive, check your spam folder
- Verify all IDs and keys are correct in script.js
- Check EmailJS dashboard for delivery logs
- Make sure your email service is properly connected

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- Basic templates
- Email delivery only

For SMS, you may need a paid service or use email-to-SMS gateways.
