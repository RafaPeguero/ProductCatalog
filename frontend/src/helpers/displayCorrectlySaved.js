import Swal from "sweetalert2";

const displayCorrectlySavedDefaults = {
    title: "¡Guardado!",
    text: "La información fue guardada exitosamente",
    confirmButtonText: "Ok",
    icon: "success",
};

export const displayCorrectlySaved = (
    onFinishFn = () => { },
    params
) => {
    Swal.close();
    Swal.fire( {
        ...displayCorrectlySavedDefaults,
        ...params,
    } ).then( ( result ) => {
        onFinishFn();
    } );
};
