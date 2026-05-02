import React, { useState, useEffect } from 'react';
import { db } from './FirebaseConfig'; // Buranın doğru olduğundan emin ol
import { ref, onValue } from "firebase/database"; // Bunlar eksikse ekran beyaz olur