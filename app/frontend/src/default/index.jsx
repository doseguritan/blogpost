import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App';
import 'virtual:windi.css';
import { RouterProvider } from 'react-router';
import routes from './routes';

const root = createRoot(document.getElementById("root"))
root.render(
    <RouterProvider router={routes} />
)