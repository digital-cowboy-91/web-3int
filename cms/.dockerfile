FROM directus/directus:10.8.3

# ARG KEY
# ARG SECRET

# ARG DB_CLIENT
# ARG DB_HOST
# ARG DB_PORT
# ARG DB_DATABASE
# ARG DB_USER
# ARG DB_PASSWORD
# ARG DB_SSL
# ARG DB_SSL_CA

# ARG ADMIN_EMAIL
# ARG ADMIN_PASSWORD

# ENV KEY $KEY \
#     SECRET $SECRET \

#     DB_CLIENT $DB_CLIENT \
#     DB_HOST $DB_HOST \
#     DB_PORT $DB_PORT \
#     DB_DATABASE $DB_DATABASE \
#     DB_USER $DB_USER \
#     DB_PASSWORD $DB_PASSWORD \
#     DB_SSL $DB_SSL \
#     DB_SSL_CA $DB_SSL_CA \

#     ADMIN_EMAIL $ADMIN_EMAIL \
#     ADMIN_PASSWORD $ADMIN_PASSWORD \

EXPOSE 8055

WORKDIR /directus
COPY ./cms/ .

# Enable NPMJS extensions
# USER root
# RUN corepack enable \
#     && corepack prepare pnpm@8.7.6 --activate \
#     && chown node:node /directus

USER node
CMD node /directus/cli.js bootstrap \
    && node /directus/cli.js start