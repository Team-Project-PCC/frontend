"use client";

export default function ProfilePage({
    profile,
    isEditing,
    onChange,
    onSave,
    onEdit,
    onChangePhoto,
}) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-6">Profil Saya</h2>
            {/* Foto Profil */}
            <div className="flex flex-col items-center mb-6">
                <img
                    src={profile.photo || "/images/user1.jpg"}
                    alt="Profile"
                    className="w-36 h-36 rounded-full object-cover mb-4"
                />
                {isEditing && (
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onChangePhoto}
                            className="mb-2"
                        />
                    </div>
                )}
            </div>

            {/* Form Profil */}
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={profile.username}
                        onChange={onChange}
                        className="border p-2 w-full"
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label className="block">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={onChange}
                        className="border p-2 w-full"
                        disabled={!isEditing}
                    />
                </div>
            </div>

            {/* Tombol */}
            <div className="mt-6 flex gap-4">
                {isEditing ? (
                    <button
                        onClick={onSave}
                        className="bg-green-500 text-white px-6 py-2 rounded"
                    >
                        Simpan
                    </button>
                ) : (
                    <button
                        onClick={onEdit}
                        className="bg-blue-500 text-white px-6 py-2 rounded"
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
}
