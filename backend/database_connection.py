import psycopg2
from psycopg2.extras import RealDictCursor


class DatabaseConnection:
    def __init__(self, db_host: str, db_user: str, db_password: str, db_name: str, db_port: int = 5432):
        self.__db_name = db_name
        self.__db_host = db_host
        self.__db_user = db_user
        self.__db_password = db_password
        self.__db_port = db_port
        self.__connection: psycopg2.connection = None
        self.get_connected()
        self.cursor: RealDictCursor = self.get_cursor()

    def get_connected(self) -> bool:
        try:
            self.__connection = psycopg2.connect(database=self.__db_name,
                                                 host=self.__db_host,
                                                 user=self.__db_user,
                                                 password=self.__db_password,
                                                 port=self.__db_port)
            return True
        except Exception as e:
            print(f'Error connecting to database: {e}')
            return False

    def get_cursor(self) -> RealDictCursor:
        try:
            self.cursor = self.__connection.cursor(cursor_factory=RealDictCursor)
        except psycopg2.InterfaceError as e:
            print(f'Error getting cursor: {e}\n Resetting connection.')
            print(f'{e} - connection will be reset')
            # Close old connection (if
            self.close_connection()
            # Reconnect
            if self.get_connected():
                self.cursor = self.__connection.cursor(cursor_factory=RealDictCursor)
        return self.cursor

    def close_connection(self):
        try:
            if self.__connection:
                try:
                    if self.cursor:
                        self.cursor.close()
                except psycopg2.InterfaceError as e:
                    print(f'Error closing cursor: {e}')
                self.__connection.close()
        except psycopg2.InterfaceError as e:
            print(f'Error closing connection: {e}')
