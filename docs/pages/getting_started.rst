Getting Started
=======================
This page shows how to quickly get started with **NovaCord**.

Installing
-----------
Python 3.9 or higher is required.
::

    pip install novacord

You can also install the latest version from GitHub. Note that this version may be unstable.
::

    pip install git+https://github.com/tibue99/novacord


First Steps
--------------
You should already have a basic understanding of **Discord.py** or **Pycord**.

1. Create a new bot in the `Discord Developer Portal <https://discord.com/developers/applications/>`_
2. Create a bot object using :doc:`novacord.Bot </novacord/bot>`

.. hint::
    If you are using Pycord with Prefix commands, use ``novacord.PrefixBot`` instead.


Example
--------------
A quick example of how NovaCord works. You can find more examples :doc:`here </examples/examples>`.

.. literalinclude:: ../../examples/pycord.py
   :language: python
   :caption: Pycord

.. literalinclude:: ../../examples/dpy.py
   :language: python
   :caption: Discord.py
