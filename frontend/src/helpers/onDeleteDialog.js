import Swal from "sweetalert2";

const onDeleteDefaults = {
    title: "¿Estás seguro?",
    icon: "warning",
    cancelButtonText: "Cancelar",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "Si",
};

export const onDeleteDialog = (
    callback,
    params
) => {
    Swal.fire( { ...onDeleteDefaults, ...params } ).then( ( { isConfirmed } ) => {
        if ( isConfirmed ) {
            callback();
        }
    } );
};
