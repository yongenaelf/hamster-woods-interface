FROM cgr.dev/chainguard/node
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

# https://nextjs.org/docs/14/pages/api-reference/next-config-js/output
ADD .next/standalone ./
ADD public ./public
ADD .next/static ./.next/static

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["server.js"]