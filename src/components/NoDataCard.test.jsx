import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect,  } from 'vitest';
import '@testing-library/jest-dom';

import NoDataCard from "./NoDataCard";

describe("Empty correct card", ()=>{
    render(<NoDataCard/>)
    test("test content in no data card", ()=>{
        expect(screen.getByText("No vehicles found..."));
    });
});