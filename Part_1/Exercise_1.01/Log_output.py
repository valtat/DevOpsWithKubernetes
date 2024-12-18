import logging, random, string, datetime, threading

random_string = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))

logging.basicConfig(filename='Log_output.log', level=logging.DEBUG)

def log_output():
    threading.Timer(5.0, log_output).start()
    dt = datetime.datetime.now()
    logging.debug(f'{dt}: {random_string}')


print('Logging started')
log_output()