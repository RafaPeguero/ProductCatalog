import Swal from "sweetalert2";

const displayErrorDefaults = {
    title: "Ocurrió un error",
    text: "Intentelo más tarde, si el error persiste contacte al departamento de tecnología",
    icon: "error",
    confirmButtonText: "Ok",
};

export const displayError = ( params, onFinishFn = () => { } ) => {
    return Swal.fire( {
        ...displayErrorDefaults,
        ...params,
    } ).then( result => {
        if ( result ) {
            onFinishFn();
        }
    } );
};
