PostgreSQL
=======================
NovaCord provides a helper class to simplify ``asyncpg`` database calls. Create a subclass of
:class:`~novacord.sql.PGHandler` to get started.

.. literalinclude:: ../../../examples/database/example.env
   :language: python
   :caption: .env.example

.. literalinclude:: ../../../examples/database/postgres.py
   :language: python
   :caption: main.py
