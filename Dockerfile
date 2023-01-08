FROM rust:1.66.0

RUN curl -fsSL https://deb.nodesource.com/setup_19.x | bash - &&\
    apt-get install -y nodejs

RUN useradd -m -u 1000 rust

USER rust

WORKDIR /home/rust/app

EXPOSE 8080

CMD ["tail", "-f", "/dev/null"]
