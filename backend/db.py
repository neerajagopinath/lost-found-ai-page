import sqlite3

DB_NAME = "lostfound.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    # Create a table for items
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,        -- 'lost' or 'found'
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        location TEXT,
        contact TEXT,
        date TEXT DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Create a table for users
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
    ''')

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("✅ Database initialized: items & users tables ready.")