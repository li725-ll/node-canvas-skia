#include <iostream>
#include "opengl.h"

void CreateOpenGLContext(){

#ifdef _WIN32
    GLFWwindow *window;

    if (!glfwInit())
    {
        std::cout << "Error: Failed to initialize GLFW" << std::endl;
    }

    window = glfwCreateWindow(1, 1, " ", NULL, NULL);
    if (!window)
    {
        glfwTerminate();
    }

    glfwHideWindow(window);
    glfwMakeContextCurrent(window);

  // glfwTerminate();
#endif
#ifdef __APPLE__
#endif
}
