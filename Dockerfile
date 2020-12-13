FROM node:latest
RUN apt-get update && apt-get -y install cron

# define working deirectory
WORKDIR /app

# copy dep. and install packages
COPY package*.json ./
RUN npm ci --only=production

# copy source code into image
COPY . .

# Copy run-cron file to the cron.d directory
COPY run-cron /etc/cron.d/run-cron

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/run-cron
RUN chmod 0744 /etc/cron.d/run-cron


# Apply cron job
RUN crontab /etc/cron.d/run-cron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Run the command on container startup
CMD cron && tail -f /var/log/cron.log