"use client"

import { QueryClient, QueryClientProvider as ReactQueryProvider} from "@tanstack/react-query";

export default function QueryClientProvider({children} : {children : React.ReactNode}) {
    
    const queryClient = new QueryClient();

    return (
        <ReactQueryProvider client={queryClient}>
            {children}
        </ReactQueryProvider>
    )
}
