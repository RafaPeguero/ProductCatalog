import React from "react";

function useDataTableColumns ( {
    columns = [],
    onEdit,
    onDelete,
    onView
} ) {
    return [ ...columns, {
        name: 'Acciones',
        selecttor: row => row.id,
        cell: ( row, index ) => {
            return ( <>
                {
                    onView && (
                        <button
                            style={ { marginRight: '5px' } }
                            className='btn btn-sm btn-outline-info'
                            onClick={ () => onView( row ) }
                        >
                            Detalle
                        </button>
                    )
                }
                {
                    onEdit && (
                        <button
                            style={ { marginRight: '5px' } }
                            className='btn btn-sm btn-outline-success'
                            onClick={ () => onEdit( row ) }
                        >
                            Editar
                        </button>
                    )
                }
                {
                    onDelete && (
                        <button
                            style={ { marginRight: '5px' } }
                            className='btn btn-sm btn-outline-danger'
                            onClick={ () => onDelete( row ) }
                        >
                            Eliminar
                        </button>
                    )
                }
            </> )
        }
    } ]
};

export default useDataTableColumns;
