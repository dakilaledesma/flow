import webview
import ctypes
import win32gui, win32process, win32api, win32con
import os

user32 = ctypes.windll.user32
width, height = user32.GetSystemMetrics(0), user32.GetSystemMetrics(1)
window_height = int(height / 4.32)

class Api:

    def flow_done(self):
        global window
        window.restore()
        window.show()
        if window.height < window_height / 2:
            window.toggle_fullscreen()

    def break_done(self):
        global window, window_height
        window.restore()
        window.show()
        if window.height > window_height / 2:
            window.toggle_fullscreen()
            window.resize(int(window_height * 1.6), height=window_height)


if __name__ == '__main__':
    api = Api()

    window = webview.create_window('',
                                   "html/index.html",
                                   js_api=api,
                                   width=int(window_height * 1.6), height=window_height,
                                   on_top=True)
    webview.start(window, debug=True)
    # webview.start(on_loaded, window)
