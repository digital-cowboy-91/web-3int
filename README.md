This is a test project aimed at learning about and integrating various libraries and tools into a meaningful application. The application itself represents a simple webstore offering 3D models for sale as digital files or printed physical items.

## Live Service (WIP)
https://3int.colaia.dev/

**! Warning !** - If you do plan to test the application/workflow, you will need a valid email address and postcode. Please avoid using your own email address, instead use some external service with generated temporary emails.

**Disclaimer** - This is a testing project, application may fail at any point or some services might be unavailable (e.g. mail delivery).

## Stack
1. Backend - Directus (CMS) with SQLite, Stripe, Zeptomail (Transactional emails), React Email
2. Frontend - Next.JS / React, Tailwind, Framer Motion, ReCaptcha
4. Server - Digital Ocean Droplet, Nginx, CDN

## Features
1. App should be fast, most of the pages should be prerenderd on the server, images are stored in CDN
2. Data is cached in Next.JS and revalidated on demand when content changes in CMS (handled by Directus Flow)
3. User can see images and/or videos of models
4. User can download free models immediately
5. User can put paybale models into a basket
6. User can proceed to checkout to buy models (to test this feature use credit card `4242 4242 4242 4242`, with valid future date and random CVC)
7. User should receive an email with link to downloadable items upon successful payment
8. Downloadable links are different for each purchase
9. User can contact owner through contact form
10. Owner recieves automated email (notification) about newly received message
11. Owner can track orders in CMS (worflow handled by Stripe Webhook and Directus Flow)

## Screenshots
### Web Frontpage
![image](https://github.com/user-attachments/assets/787e9458-71f1-4c71-a21a-c4bfc014c8b0)

### Web Product page
![image](https://github.com/user-attachments/assets/d3336fa2-ecb5-47ec-ac01-f28022559770)

### Web Cart
![image](https://github.com/user-attachments/assets/4a552c46-297e-4169-af10-abf985bae91c)

### Web Checkout
![checkout](https://github.com/user-attachments/assets/e50a3477-7054-4ca7-a64a-f7d24fca5935)

### Order confirmation with download link
![email](https://github.com/user-attachments/assets/a7b0356c-350a-46e0-b3fa-b1c43fbddf45)

### CMS Worflow handling order status
![image](https://github.com/user-attachments/assets/85872fea-0a7a-47af-8e1e-75cd7973d632)

### CMS Order Preview
![image](https://github.com/user-attachments/assets/686d33c4-b6ef-488d-929b-a1e414925228)
