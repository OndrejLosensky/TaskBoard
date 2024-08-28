const EditTaskModal= () => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-semibold">Edit Container</h2>
                <form >
                    <input
                        type="text"                                               
                        className="border p-2 rounded w-full mt-2"
                    />
                    <div className="mt-4 flex justify-end">
                        <button
                            type="button"
                            className="mr-2 px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Save
                        </button>
                        <button
                            type="button"                           
                            className="ml-2 px-4 py-2 bg-red-600 text-white rounded"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskModal;
