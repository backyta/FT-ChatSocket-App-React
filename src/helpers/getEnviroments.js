
export const getEnvironments = () => {
    
    const envs  = import.meta.env;
 
    return{
        ...envs
    };
};