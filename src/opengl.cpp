#include <iostream>
#include "opengl.h"

void CreateOpenGLContext(){
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
}
