const http = require("http");

const employees = [
  { id: 1, name: "Emmanuel" },
  { id: 2, name: "Agnes" },
  { id: 3, name: "Frederick" },
];

const requestHandler = (req, res) => {
  const { method, url } = req;
  const parts = url.split("/");
  const id = parts[2];

  //! Get all employees
  if (method === "GET" && url === "/employees") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(employees));
  }

  //! Get single employee
  else if (method === "GET" && parts[1] === "employees" && id) {
    const employee = employees.find((emp) => emp.id === parseInt(id));
    if (employee) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(employee));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Employee not found" }));
    }
  }

  //! Create new employee
  else if (method === "POST" && url === "/employees") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const newEmployee = JSON.parse(body);
        if (newEmployee && newEmployee.name) {
          newEmployee.id = employees.length
            ? employees[employees.length - 1].id + 1
            : 1;
          employees.push(newEmployee);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              message: "Employee created successfully",
              newEmployee,
              employees,
            })
          );
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Invalid employee data" }));
        }
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid JSON" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};

// Create the server
const server = http.createServer(requestHandler);

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
