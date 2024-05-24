# <div>Next Techiekart</div>

✅ One-stop e-commerce app for all your daily needs.

<details>
<summary>Anonymous Cart</summary>

https://github.com/ranepaarth/next-techiekart-ecomm/assets/130083485/20c9596d-e52a-407c-8e2f-63e2096cb845


</details>

<details>
<summary>User Cart</summary>

https://github.com/ranepaarth/next-techiekart-ecomm/assets/130083485/34353839-27b8-47bd-9125-1911b7d03a91


</details>

<details>
<summary>Stripe Checkout</summary>

https://github.com/ranepaarth/next-techiekart-ecomm/assets/130083485/f938d37c-3625-48c9-907c-eaa6e7e8a23f


</details>

<details>
<summary>Anonymous & User Cart</summary>

https://github.com/ranepaarth/next-techiekart-ecomm/assets/130083485/616d4aee-34de-4559-96c0-c5c7249dc3e6


</details>

</br>

> **Note**
>
> The main purpose of this project was to learn the integration of stripe payments and utilize webhooks for listening to various events like payment completion

## Features

- OAuth Authentication
- User & Anonymous Carts
- Stripe Checkout
- View Previous Orders

## Tech Stack

- [Next.js / TailwindCSS](https://nextjs.org/docs/getting-started/installation)
- [Auth.js](https://authjs.dev/getting-started/migrating-to-v5)
- [Prisma ORM](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma)
- [Postgres Docker setup for dev](https://cloudinary.com/)
- [Stripe](https://docs.stripe.com/get-started)

## Installation

1. Clone the repository: `git clone https://github.com/ranepaarth/next-photo-album.git`
2. Navigate to the project directory: `cd next-photo-album`
3. Install the dependencies: `npm install`

### Environment Variables

Add a `.env` file in the root directory and follow

```

#It is the secret used to encode the JWT and encrypt things in transit
# This can be generated via the CLI with "npx auth secret" or via openssl with "openssl rand -base64 33".
AUTH_SECRET

# For development http://localhost:3000
# After deployment this will change to your domain: e.g. https://example.com
AUTH_URL

# Refer https://authjs.dev/getting-started/providers/google to setup env values
AUTH_GOOGLE_ID
AUTH_GOOGLE_SECRET

# The following variables will be useful while setting up the Docker Container for Postgres and Adminer
POSTGRES_DB
POSTGRES_USER
POSTGRES_PASSWORD

# The Postgres Database connection URL
(postgresql://POSTGRES_USER:POSTGRES_PASSWORD@localhost:5432/POSTGRES_DB)
DATABASE_URL

# After signing into stripe, visit "https://dashboard.stripe.com/test/apikeys" to retrieve below values
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY

# For development http://localhost:3000
# After deployment this will cahnge to your domain: e.g. https://example.com
CLIENT

```

### Generate Stripe Webhook Signing Secret

1. Download the [Stripe CLI](https://docs.stripe.com/stripe-cli) and log in with your Stripe account

```shell
$ stripe login
```

2. Forward events to your webhook

```shell
$ stripe listen --forward-to localhost:3000/api/webhook
```

3. Your Webhook Signing secret is ready to be used

```shell
$ Ready! Your webhook signing secret is '{{WEBHOOK_SIGNING_SECRET}}' (^C to quit)
```

4. Add the webhook secret inside the `.env` file

```shell
STRIPE_WEBHOOK_SECRET = whsec_1234
```

This generated webhook secret is used to listen to the events in your Stripe account on your webhook endpoint so your integration can automatically trigger reactions.
Learn more about [Stripe Webhooks](https://docs.stripe.com/webhooks)


## Usage

1. Start development server `npm run dev`
2. Get your postgres and adminer images up and running by executing `docker-compose up`. You can use the `-d` flag to execute this operation in detached mode.
3. Get your prisma studio up and running using `npx prisma studio` command and visit [http://localhost:5555](http://localhost:5555) to start editing in your database.
4. Open your Browser and visit [http://localhost:3000](http://localhost:300) to view the website

## Concepts covered

- [x] NextJs 14 App routing & SSR
- [x] Auth.js Authentication
- [x] Extending User sessions
- [x] Server Actions
- [x] Stripe payment and checkout
- [x] Stripe CLI
