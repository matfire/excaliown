FROM scratch

COPY excaliown /usr/bin/excaliown
ENTRYPOINT ["/usr/bin/excaliown"]
