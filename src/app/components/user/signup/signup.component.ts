import { Component, OnInit } from "@angular/core";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/models/user";
import { InputState } from "src/app/models/inputState";
import { UserService } from "src/app/services/user.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  faRecordVinyl = faRecordVinyl;
  form: FormGroup;

  nameState: InputState = {
    errorMsg: "",
    errorMsgTrigger: false,
    successState: false,
  };

  emailState: InputState = {
    errorMsg: "",
    errorMsgTrigger: false,
    successState: false,
  };

  passwordState: InputState = {
    errorMsg: "",
    errorMsgTrigger: false,
    successState: false,
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  checkErrorOnBlur(control: string, maxLength: number, inputState: InputState) {
    const controlCapitalized =
      control.charAt(0).toUpperCase() + control.slice(1);

    if (this.form.get(control).hasError("required")) {
      inputState.errorMsg = `${controlCapitalized} is required`;
    }

    if (this.form.get(control).hasError("minlength")) {
      inputState.errorMsg = `${controlCapitalized} must be at least ${maxLength} characters`;
    }

    if (
      control === "email" &&
      !this.form.get(control).valid &&
      !this.form.get(control).hasError("required")
    ) {
      inputState.errorMsg = "Email is invalid";
    }
  }

  checkInput(e: any, control: string, maxLength: number) {
    setTimeout(() => {
      const controlCapitalized =
        control.charAt(0).toUpperCase() + control.slice(1);
      let inputState;

      if (control === "name") {
        inputState = this.nameState;
      } else if (control === "email") {
        inputState = this.emailState;
      } else {
        inputState = this.passwordState;
      }

      if (e.type === "blur") {
        inputState.errorMsgTrigger = true;

        this.checkErrorOnBlur(control, maxLength, inputState);

        return;
      }
      //TRIGGER SUCCESS STATE
      if (
        this.form.get(control).value.length >= maxLength ||
        (control === "email" && this.form.get(control).valid)
      ) {
        inputState.successState = true;
        inputState.errorMsg = "";
      }
      //UNTRIGGER SUCCESS STATE
      if (
        this.form.get(control).value.length < maxLength ||
        (control === "email" && !this.form.get("email").valid)
      ) {
        inputState.successState = false;

        if (inputState.errorMsgTrigger) {
          return;
        }

        //EMAIL LOGIC
        if (control === "email") {
          if (this.form.get(control).value.length > 0) {
            inputState.errorMsg = "Email is invalid";
          } else {
            inputState.errorMsg = "Email is required";
          }
        }
        //USERNAME & PASSWORD LOGIC
        if (control !== "email") {
          if (this.form.get(control).value.length > 0) {
            inputState.errorMsg = `${controlCapitalized} must be at least ${maxLength} characters`;
          } else {
            inputState.errorMsg = `${controlCapitalized} is required`;
          }
        }
      }
    }, 10);
  }

  onSubmit() {
    if (this.form.valid) {
      const user: User = {
        name: this.form.get("name").value,
        email: this.form.get("email").value,
        password: this.form.get("password").value,
      };

      this.userService.createUser(user);
      this.router.navigate(["../"], { relativeTo: this.route });
    }
  }
}
